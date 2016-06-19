robot.on(Protocol.Report.class, report -> {
    if (report.getJoystickCount() > 0) {
        Protocol.Coordinate coordMean = report.getJoystick(0).getCoordMean();
        Point mousePosition = MouseInfo.getPointerInfo().getLocation();
        controller.mouseMove(
                ((int) (mousePosition.getX() + 300 * coordMean.getX())),
                ((int) (mousePosition.getY() + 300 * coordMean.getY()))
        );
    }
});