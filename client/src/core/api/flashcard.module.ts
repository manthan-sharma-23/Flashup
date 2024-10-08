import axios from "axios";
import { configurations } from "../lib/config/config";
import { Bookmark, Flashcard } from "../lib/types/global.types";
import { FlashCardInput } from "../lib/types/flashcard.types";

export default class FlashCardModule {
  private base_url: string;
  private token: string;

  constructor() {
    this.base_url = configurations.server.http_url + "/v1/flashcard";
    this.token = "Bearer " + window.localStorage.getItem("token");
  }

  private get_flash_card = async ({ flashCardId }: { flashCardId: string }) => {
    const data = (
      await axios.get(this.base_url + `/${flashCardId}`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Flashcard;
    return data;
  };
  private get_flash_cards_by_user = async () => {
    const data = (
      await axios.get(this.base_url + `/user/fc`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Flashcard[];
    return data;
  };

  private get_all_flash_cards = async () => {
    const data = (
      await axios.get(this.base_url + `/all`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Flashcard[];
    return data;
  };

  private create_flash_card = async (input: FlashCardInput) => {
    const data = (
      await axios.post(
        this.base_url + `/create`,
        { ...input, isTopic: input.isTopic || false },
        {
          headers: {
            Authorization: this.token,
          },
        }
      )
    ).data as Flashcard;
    return data;
  };

  private delete_flash_card = async ({
    flashCardId,
  }: {
    flashCardId: string;
  }) => {
    const data = (
      await axios.delete(this.base_url + `/delete-flashcard/${flashCardId}`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Flashcard;
    return data;
  };

  private update_flash_card = async ({
    flashCardId,
    input,
  }: {
    flashCardId: string;
    input: FlashCardInput;
  }) => {
    const data = (
      await axios.put(
        this.base_url + `/update_flash_card/${flashCardId}`,
        input,
        {
          headers: {
            Authorization: this.token,
          },
        }
      )
    ).data as Flashcard;
    return data;
  };

  private bookmark_flash_card = async ({
    flashCardId,
  }: {
    flashCardId: string;
  }) => {
    const data = (
      await axios.post(
        this.base_url + `/bookmark/${flashCardId}`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
        }
      )
    ).data as Flashcard;
    return data;
  };

  private get_all_bookmarks = async () => {
    const data = (
      await axios.get(this.base_url + `/user-bookmarks`, {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as Bookmark[];
    return data;
  };

  get flashCard() {
    return {
      get_all_bookmarks: this.get_all_bookmarks,
      get_flash_card: this.get_flash_card,
      get_all_flash_cards: this.get_all_flash_cards,
      create_flash_card: this.create_flash_card,
      delete_flash_card: this.delete_flash_card,
      update_flash_card: this.update_flash_card,
      bookmark_flash_card: this.bookmark_flash_card,
      get_flash_cards_by_user: this.get_flash_cards_by_user,
    };
  }
}
