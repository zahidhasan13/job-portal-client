import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const JobCategorySection = () => {
  // Categories data - just names as specified
  const categories = [
    "Technology",
    "Finance",
    "Healthcare",
    "Business",
    "Logistics",
    "Education",
    "Construction",
    "Design",
    "Retail",
    "Corporate",
    "Marketing",
    "Customer Service",
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4"
              >
                <div className="p-1">
                  <Button
                    variant="outline"
                    className="w-full h-full text-base py-6 border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {category}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default JobCategorySection;
