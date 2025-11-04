# apps/references/models/strategic_actions.py
from django.db import models
from .strategic_objective import StrategicObjective
from .strategic_source import StrategicSource

from django.db.models import Q, Count

class StrategicAction(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    strategic_objective = models.ForeignKey(StrategicObjective, on_delete=models.CASCADE, related_name="actions")

    # Target & capaian
    current = models.IntegerField(default=0)
    target = models.IntegerField(default=0)
    unit = models.CharField(max_length=50, blank=True, null=True)

    # Data tahunan
    all_year = models.JSONField(default=dict, blank=True, null=True)
    yearly_data = models.JSONField(default=list, blank=True, null=True)

    # Sumber & filter
    strategic_source = models.ForeignKey(StrategicSource, on_delete=models.SET_NULL, null=True, blank=True, related_name="actions")
    filter_keyword = models.CharField(max_length=255, blank=True)
    # Gunakan kata kunci untuk filter judul penelitian/pengabdian/publikasi

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"
    

    # 🧠 FUNGSI OTOMATIS MENGHITUNG NILAI CURRENT & YEARLY
    def update_current_values(self):

        from django.apps import apps  # agar bisa ambil model secara dinamis

        # --- 1️⃣ Validasi awal: pastikan strategic_source ada dan punya code
        if not self.strategic_source or not self.strategic_source.code:
            return

        # --- 2️⃣ Ambil model dinamis berdasarkan kode sumber (misal: 'penelitian')
        model_name = self.strategic_source.code.lower()  # contoh: 'penelitian'
        keyword = self.filter_keyword.strip().lower()

        try:
            # Ambil model dinamis dari apps lppm
            model = apps.get_model("lppm", model_name.capitalize())
        except LookupError:
            print(f"[WARNING] Model '{model_name}' tidak ditemukan di apps LPPM.")
            return

        # --- 3️⃣ Ambil semua field CharField untuk pencarian teks (judul, keterangan, dll)
        str_fields = [
            f.name for f in model._meta.get_fields()
            if hasattr(f, "get_internal_type") and f.get_internal_type() == "CharField"
        ]

        # --- 4️⃣ Bangun query OR untuk mencari kata kunci di semua field string
        query = Q()
        for field in str_fields:
            query |= Q(**{f"{field}__icontains": keyword})

        queryset = model.objects.filter(query)

        # --- 5️⃣ Hitung jumlah total (current)
        self.current = queryset.count()

        # --- 6️⃣ Cari field tahun (nama kolom bisa 'tahun', 'year', atau 'tahun_kegiatan')
        year_field = None
        for field_name in ["tahun", "year", "tahun_kegiatan"]:
            if field_name in [f.name for f in model._meta.get_fields()]:
                year_field = field_name
                break

        # --- 7️⃣ Jika ada field tahun, hitung total per tahun
        if year_field:
            field_object = model._meta.get_field(year_field)

            # 💡 Cek apakah field tersebut FK (contohnya ForeignKey ke model Tahun)
            if field_object.is_relation:
                # Karena FK, maka kita ambil nama tahun dari relasi (misalnya Tahun.name)
                yearly = (
                    queryset
                    .values(f"{year_field}__name")  # ambil field 'name' dari relasi
                    .annotate(total=Count("id"))
                    .order_by(f"{year_field}__name")
                )

                # Konversi hasil ke format list of dicts
                self.yearly_data = [
                    {"year": int(item.get(f"{year_field}__name")), "value": item["total"]}
                    for item in yearly
                    if item.get(f"{year_field}__name") is not None
                ]

            else:
                # Jika bukan FK, langsung ambil nilainya
                yearly = (
                    queryset
                    .values(year_field)
                    .annotate(total=Count("id"))
                    .order_by(year_field)
                )

                self.yearly_data = [
                    {"year": item[year_field], "value": item["total"]}
                    for item in yearly
                    if item[year_field] is not None
                ]

        # --- 8️⃣ Simpan hasil
        self.save()
        