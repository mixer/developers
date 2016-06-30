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
