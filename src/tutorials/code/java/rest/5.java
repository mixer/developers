import com.mixer.api.MixerAPI;
import com.mixer.api.http.SortOrderMap;
import com.mixer.api.resource.channel.MixerChannel;
import com.mixer.api.response.channels.ShowChannelsResponse;
import com.mixer.api.services.impl.ChannelsService;

import java.util.concurrent.ExecutionException;

public class Tutorial {
    public static MixerAPI mixer;

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        mixer = new MixerAPI("CLIENT_ID");

        MixerChannel channel = mixer.use(ChannelsService.class).findOneByToken(args[0]).get();

        int viewers = channel.viewersTotal;
        System.out.format("You have %d total viewers...\n", viewers);

        run(0,viewers,1);


    }
    public static int run(int page, int viewers, int rank) throws ExecutionException,InterruptedException {
        ShowChannelsResponse channels = getChannelsPage(page);
        for (int i = 0; i < channels.size(); i++) {
            MixerChannel channel = channels.get(i);
            if (channel.viewersTotal <= viewers) {
                System.out.format("Your rank on Mixer is %d!\n", rank);
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
        return mixer.use(ChannelsService.class).show(map,page,100).get();
    }
}
