let json = {"tactile": [new Packets.ProgressUpdate.TactileUpdate({"id": 0, "cooldown": 30000})]};
let update = Packets.ProgressUpdate(json);
robot.send(Packets.ProgressUpdate(update));
