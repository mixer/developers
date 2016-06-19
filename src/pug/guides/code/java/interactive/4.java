package pro.beam.interactive.example;

import pro.beam.api.BeamAPI;
import pro.beam.interactive.net.packet.Protocol;
import pro.beam.interactive.robot.RobotBuilder;

import java.awt.*;

import java.util.concurrent.ExecutionException;

public class Main {

    public static void main(String[] args) throws AWTException {
        BeamAPI beam = new BeamAPI();
        Robot controller = new Robot();
        try {
            pro.beam.interactive.robot.Robot robot = new RobotBuilder()
                    .username("connor")
                    .password("password")
                    .channel(1234).build(beam).get();

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
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
