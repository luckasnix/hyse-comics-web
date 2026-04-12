export type RecommendationCardProps = Readonly<{
  chapterId: string;
  title: string;
  synopsis: string;
  imageUrl: string;
  onReadButtonClick: (chapterId: string) => void;
}>;
