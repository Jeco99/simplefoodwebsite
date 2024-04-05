export interface CardDatatype {
    name: string;
    description: string;
    rating: number;
    image_url: string;
  }

export interface SearchDataProp{
  onSearch: (query :string) => void;
}

export interface FoodDataProp{
  data: CardDatatype[]
}

export interface ToggleProps {
  handleDarkMode: () => void; 
  isDarkMode: boolean; 
}

export interface Movies {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  overview: string;
  phoneNumber: string;
}

