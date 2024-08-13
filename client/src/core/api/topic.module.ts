import axios from "axios";
import { configurations } from "../lib/config/config";
import { Topic } from "../lib/types/global.types";
import { TopicInput } from "../lib/types/topic.type";

export default class TopicModule {
  private base_url: string;
  private token: string;

  constructor() {
    this.base_url = configurations.server.http_url + "/v1/topics";
    this.token = "Bearer " + localStorage.getItem("token");
  }

  private create_topic = async (input: TopicInput) => {
    const data = (
      await axios.post(this.base_url + `/create`, input, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Topic;
    return data;
  };

  private get_topics = async () => {
    const data = (
      await axios.get(this.base_url + `/topics`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Topic[];
    return data;
  };
  private get_all_topics = async () => {
    const data = (
      await axios.get(this.base_url + `/all`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Topic[];
    return data;
  };

  private get_topic_flash_cards = async ({ topicId }: { topicId: string }) => {
    const data = (
      await axios.get(this.base_url + `/topic/${topicId}`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Topic;
    return data;
  };

  get topic() {
    return {
      create_topic: this.create_topic,
      get_topics: this.get_topics,
      get_topic_flash_cards: this.get_topic_flash_cards,
      get_all_topics: this.get_all_topics,
    };
  }
}
