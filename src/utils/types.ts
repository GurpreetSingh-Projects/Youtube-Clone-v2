export type ModalProps = {
  helpModal: boolean;
  notifyModal: boolean;
  profileModal: boolean;
};

export type ShowModalProps = {
  modalName: "helpModal" | "notifyModal" | "profileModal";
};
export type SearchRecommendationsProps = {
  words: string[];
};
export type WelcomeProps = {
  firstRender: boolean;
};
