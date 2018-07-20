//...
public static ShowChannelsResponse getChannelsPage(int page) throws ExecutionException,InterruptedException  {
    SortOrderMap<ShowChannelsResponse.Attributes, ShowChannelsResponse.Ordering> map = new SortOrderMap<>();
    map.put(ShowChannelsResponse.Attributes.VIEWERS_TOTAL, ShowChannelsResponse.Ordering.DESCENDING);
    return mixer.use(ChannelsService.class).show(map,page,100).get();
}
//...
