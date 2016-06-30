import pro.beam.api.BeamAPI;
import pro.beam.api.http.SortOrderMap;
import pro.beam.api.resource.BeamUser;
import pro.beam.api.resource.channel.BeamChannel;
import pro.beam.api.response.channels.ShowChannelsResponse;
import pro.beam.api.services.impl.ChannelsService;
import pro.beam.api.services.impl.UsersService;

import java.util.concurrent.ExecutionException;

public class Tutorial {
    public static BeamAPI beam;

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        String username = args[0];
        String password = args[1];
        beam = new BeamAPI();
    }
}
