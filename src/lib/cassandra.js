import config from "config";
import {Client} from "cassandra-driver";

export const client = new Client(config.get('cassandra'));
