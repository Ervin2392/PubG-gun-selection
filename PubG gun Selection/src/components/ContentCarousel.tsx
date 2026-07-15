import { Carousel } from '@mantine/carousel'
import { Text } from '@mantine/core'

interface SlideItem {
  title: string
  description: string
  image: string
}

interface ContentCarouselProps {
  slides: SlideItem[]
}

export function ContentCarousel({ slides }: ContentCarouselProps) {
  return (
    <Carousel withIndicators height={320} mt="lg" className="carousel">
      {slides.map((slide) => (
        <Carousel.Slide key={slide.title}>
          <div className="carousel-slide">
            <img src={slide.image} alt={slide.title} />
            <div className="carousel-overlay">
              <Text fw={700} size="lg">
                {slide.title}
              </Text>
              <Text size="sm" c="dimmed">
                {slide.description}
              </Text>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
