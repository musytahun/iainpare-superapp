from apps.lppm.models.strategic_action import StrategicAction


def update_all_strategic_actions():
    """
    Mengupdate seluruh StrategicAction yang aktif.
    """
    actions = StrategicAction.objects.filter(is_active=True)
    for action in actions:
        action.update_current_values()
