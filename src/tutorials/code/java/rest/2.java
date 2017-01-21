//...
BeamUser user = beam.use(UsersService.class).getCurrent().get();

int viewers = user.channel.viewersTotal;
System.out.format("You have %d total viewers...\n", viewers);

run(0,viewers,1);
//...
