robot.on(Protocol.Report.class, report -> {
    // If we have any joysticks in the report
    if (report.getJoystickCount() > 0) {
        // Get the coordMean from the joystick
        Protocol.Coordinate coordMean = report.getJoystick(0).getCoordMean();
        Point mousePosition = MouseInfo.getPointerInfo().getLocation();

        // Apply it to the current mouse position, if its values are not NaN
        if (!Double.isNaN(coordMean.getX()) && !Double.isNaN(coordMean.getY())) {
            controller.mouseMove(
                ((int) (mousePosition.getX() + 300 * coordMean.getX())),
                ((int) (mousePosition.getY() + 300 * coordMean.getY()))
            );
        }
    }
});
