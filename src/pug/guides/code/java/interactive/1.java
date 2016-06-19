package pro.beam.interactive.example;

import pro.beam.api.BeamAPI;
import pro.beam.interactive.net.packet.Protocol;
import pro.beam.interactive.robot.RobotBuilder;

import java.awt.*;
import java.util.concurrent.ExecutionException;

public class Main {

    public static void main(String[] args) throws AWTException {
        BeamAPI beam = new BeamAPI(); //An instance of the BeamAPI from beam-client-java
        Robot controller = new Robot(); // An AWT Robot, Not a Beam Robot
    }
}
