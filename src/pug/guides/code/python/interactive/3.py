def on_error(error, conn):
    """This is called when we get an Error packet. It contains
    a single attribute, 'message'.
    """
    print('Oh no, there was an error!')
    print(error.message)


def on_report(report, conn):
    # Reports from beam will end up here
    currentMouseX, currentMouseY = pyautogui.position()
    x = report.joystick[0].coordMean.x;
    y = report.joystick[0].coordMean.y;
    if not math.isnan(x) and not math.isnan(y):
        pyautogui.moveTo(x + 300 * x, y + 300 * y)