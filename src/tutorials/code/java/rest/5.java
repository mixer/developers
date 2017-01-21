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
        beam = new BeamAPI("AUTH_TOKEN");

        BeamUser user = beam.use(UsersService.class).getCurrent().get();

        int viewers = user.channel.viewersTotal;
        System.out.format("You have %d total viewers...\n", viewers);

        run(0,viewers,1);


    }
    public static int run(int page, int viewers, int rank) throws ExecutionException,InterruptedException {
        ShowChannelsResponse channels = getChannelsPage(page);
        for (int i = 0; i < channels.size(); i++) {
            BeamChannel channel = channels.get(i);
            if (channel.viewersTotal <= viewers) {
                System.out.format("Your rank on beam is %d!\n", rank);
                return rank;
            }
            System.out.format("Your rank is at least %d...\n", rank);
            rank++;
        }
        return run(page + 1, viewers, rank);
    }
    public static ShowChannelsResponse getChannelsPage(int page) throws ExecutionException,InterruptedException  {
        SortOrderMap<ShowChannelsResponse.Attributes, ShowChannelsResponse.Ordering> map = new SortOrderMap<>();
        map.put(ShowChannelsResponse.Attributes.VIEWERS_TOTAL, ShowChannelsResponse.Ordering.DESCENDING);
        return beam.use(ChannelsService.class).show(map,page,100).get();
    }
}
