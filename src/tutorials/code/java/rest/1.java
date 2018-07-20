import com.mixer.api.MixerAPI;
import com.mixer.api.http.SortOrderMap;
import com.mixer.api.resource.MixerUser;
import com.mixer.api.resource.channel.MixerChannel;
import com.mixer.api.response.channels.ShowChannelsResponse;
import com.mixer.api.services.impl.ChannelsService;
import com.mixer.api.services.impl.UsersService;

import java.util.concurrent.ExecutionException;

public class Tutorial {
    public static MixerAPI mixer;

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        mixer = new MixerAPI("CLIENT_ID");
    }
}
