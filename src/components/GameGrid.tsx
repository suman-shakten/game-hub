import {
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';

// interface Props {
//   gameQuery: GameQuery;
//   // selectedGenre: Genre | null;
//   // selectedPlatform: Platform | null;
// }

// function GameGrid() {
//   const {
//     data,
//     error,
//     isLoading,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = useGames(gameQuery);

function GameGrid() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGames();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return <Text>{error.message}</Text>;

  const fetchedGamesCount = data?.pages
    .reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      {/* // <Box padding="10px"> */}
      <div>
        <InfiniteScroll
          dataLength={fetchedGamesCount}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={<Spinner />}
        >
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
              lg: 3,
              xl: 5,
            }}
            spacing={3}
          >
            {isLoading
         && skeletons.map((skeleton) => (
           <GameCardContainer key={skeleton}>
             <GameCardSkeleton />
           </GameCardContainer>
         ))}
            {data?.pages.map((page, index) => (
              <React.Fragment
                key={index}
              >
                {page.results.map((game) => (
                  <GameCardContainer
                    key={game.id}
                  >
                    <GameCard game={game} />
                  </GameCardContainer>
                ))}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
        {/* {hasNextPage && (
        <Button
        type="button"
        onClick={() => fetchNextPage()}
        marginY={5}
        >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      ) } */}
        {/* </Box> */}
      </div>
    </>
  );
}

export default GameGrid;
