import { Game } from '../models/game';
import { User } from '../models/user';

export const MOCK_GAMES: Game[] = [
  {
    id: "1",
    title: "Neon Skyline",
    description: "A deep narrative cyberpunk RPG set in a sprawling megacity. Uncover the secrets of the digital underground and navigate corporate espionage.",
    price: 59.99,
    genre: ["RPG", "Cyberpunk"],
    releaseDate: "2026-05-15",
    rating: 4.8,
    imageUrl: "https://picsum.photos/id/319/800/450",
    screenshots: [],
    requirements: { os: "Windows 11", cpu: "Intel Core i7", ram: "16GB", gpu: "RTX 3070", storage: "50GB SSD" }
  },
  {
    id: "2",
    title: "Data Runners",
    description: "Fast-paced futuristic shooter. Hack networks, outrun security, and extract the data before the system purges you.",
    price: 29.99,
    genre: ["FPS", "Action"],
    releaseDate: "2025-11-20",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Intel Core i5", ram: "8GB", gpu: "GTX 1660", storage: "20GB" }
  },
  {
    id: "3",
    title: "Stellar Odyssey",
    description: "Explore uncharted galaxies, command a starship, and interact with alien civilizations in this grand space opera.",
    price: 49.99,
    genre: ["RPG", "Sci-Fi"],
    releaseDate: "2024-08-10",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Ryzen 5", ram: "16GB", gpu: "RX 6700 XT", storage: "80GB SSD" }
  },
  {
    id: "4",
    title: "Eldoria: The Awakening",
    description: "A dark fantasy adventure where magic is a dying art. Battle mythical beasts, forge your destiny, and reclaim the lost kingdom.",
    price: 39.99,
    genre: ["Adventure", "Fantasy"],
    releaseDate: "2023-12-05",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Intel Core i5", ram: "12GB", gpu: "RTX 2060", storage: "45GB" }
  },
  {
    id: "5",
    title: "Cyber Drift: Underground",
    description: "High-octane neon racing. Customize your hover-car and dominate the illicit street circuits of New Neo-Tokyo.",
    price: 19.99,
    genre: ["Racing", "Cyberpunk"],
    releaseDate: "2025-02-28",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Intel Core i3", ram: "8GB", gpu: "GTX 1050 Ti", storage: "15GB" }
  },
  {
    id: "6",
    title: "Wasteland Survival",
    description: "Scavenge, craft, and survive in a brutal post-apocalyptic world overrun by mutants and hostile survivor factions.",
    price: 24.99,
    genre: ["Survival", "Action"],
    releaseDate: "2024-10-31",
    rating: 4.1,
    imageUrl: "https://picsum.photos/id/1050/800/450",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Ryzen 3", ram: "8GB", gpu: "RX 570", storage: "30GB" }
  },
  {
    id: "7",
    title: "Galactic Command",
    description: "Real-time strategy on a galactic scale. Build fleets, manage resources, and conquer planetary systems in intense tactical battles.",
    price: 34.99,
    genre: ["Strategy", "Sci-Fi"],
    releaseDate: "2023-05-18",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 10", cpu: "Intel Core i5", ram: "8GB", gpu: "GTX 1650", storage: "25GB" }
  },
  {
    id: "8",
    title: "Shadow Protocol",
    description: "Infiltrate highly secure corporate facilities in this tense stealth-action thriller. Leave no trace, or face the consequences.",
    price: 44.99,
    genre: ["Action", "Stealth"],
    releaseDate: "2026-01-12",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    screenshots: [],
    requirements: { os: "Windows 11", cpu: "Intel Core i7", ram: "16GB", gpu: "RTX 3060", storage: "40GB SSD" }
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "u-123",
    username: "ZeroCool",
    email: "zerocool@example.com",
    avatarUrl: "assets/img/avatar.png",
    isAuthenticated: true,
    wishlistIds: ["1", "3", "5"]
  }
];
