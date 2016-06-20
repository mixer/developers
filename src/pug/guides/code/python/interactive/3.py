MOUSE = PyMouse()


def on_error(error, connection):
    """Handle error packets."""
    print("Oh no, there was an error!", error.message)


def on_report(report, connection):
    """Handle report packets."""

    # Tactile Mouse Click Control
    for tactile in report.tactile:
        if tactile.pressFrequency:
            print("Tactile report received!", tactile, sep='\n')
            MOUSE.click(*MOUSE.position())

    # Joystick Mouse Movement Control
    for joystick in report.joystick:
        if not isnan(joystick.coordMean.x) and not isnan(joystick.coordMean.y):
            print("Joystick report received!", joystick, sep='\n')
            mouse_x, mouse_y = MOUSE.position()

            MOUSE.move(
                round(joystick.coordMean.x*20) + mouse_x,
                round(joystick.coordMean.y*20) + mouse_y
            )
