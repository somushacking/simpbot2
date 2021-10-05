import { ISong, IQueueSong } from "../typings";
import { Collection, GuildMember, Snowflake, SnowflakeUtil } from "discord.js";

export class SongManager extends Collection<Snowflake, IQueueSong> {
    public addSong(song: ISong, requester: GuildMember): Snowflake {
        const firstIndex = this.sortByIndex().first()?.index;
        const key = SnowflakeUtil.generate();
        const data: IQueueSong = {
            index: firstIndex ? firstIndex + 1 : 0,
            key,
            requester,
            song
        };

        this.set(key, data);
        return key;
    }

    public sortByIndex(): SongManager {
        return this.sort((a, b) => b.index - a.index);
    }
}
