import "@testing-library/jest-dom";
import { render, screen,fireEvent } from "@testing-library/react";
import { Card } from "../component/card/card";
import { CardDatatype } from "../component/dataInterface";

describe('Check for the FoodList', () => {
    const mockCardData: CardDatatype = {
        name: "Adobo",
        description: "Filipino style adobo",
        rating: 3,
        image_url: "https://img.freepik.com/free-photo/stew-beef-pieces-beef-stewed-soy-sauce-with-spices-with-pickled-cucumber-asian-style_2829-20279.jpg?w=740"
    }

    it("renders card with correct data", () => {
        render(<Card {...mockCardData} />);

        expect(screen.getByText(mockCardData.name)).toBeInTheDocument();
        expect(screen.getByText(mockCardData.description)).toBeInTheDocument();
        expect(screen.getByText(`${mockCardData.rating} out of 5.0`)).toBeInTheDocument();
    
        const cardImage = screen.getByAltText(mockCardData.name) as HTMLImageElement;
        expect(cardImage).toBeInTheDocument();
        expect(cardImage.src).toBe(mockCardData.image_url);
      });   

})