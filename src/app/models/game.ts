export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  genre: string[];
  releaseDate: string;
  rating: number;
  imageUrl: string;
  screenshots: string[];
  requirements: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
  };
}
