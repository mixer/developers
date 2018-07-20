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
