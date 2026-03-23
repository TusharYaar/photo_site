import type { Photo, PhotoInGrid } from "./types";
import { GRID_SIZE, NUM_COLS } from "./constants";

  const isAreaFree = (startX: number, startY: number, w: number, h: number, grid: number[][]) => {
    if (startX + w > NUM_COLS - 1) return false;
    for (let x = startX; x < startX + w; x++) {
      for (let y = startY; y < startY + h; y++) {
        while (y >= grid.length) grid.push(Array(NUM_COLS).fill(0));
        if (grid[y][x] == 1) return false;
      }
    }
    return true;
  };

const markArea = (startX: number, startY: number, w: number, h: number, grid: number[][]) => {
    for (let y = startY; y < startY + h; y++) {
      for (let x = startX; x < startX + w; x++) {
        grid[y][x] = 1;
      }
    }
  };


  function shuffle<T>(array: T[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


export const getMasonryGrid = (photos: Photo[], columns = NUM_COLS, _shuffle=false): PhotoInGrid[] => {

    let currentY = 0;
    let currentX = 0;
    const layout: PhotoInGrid[] = [];
    const grid:number[][] = new Array(1).fill("").map(a =>new Array(columns).fill(0));

    if (_shuffle) 
        photos = shuffle(photos);

    for (const photo of photos) {
        // 1. Find the next available hole in the grid
        while (grid[currentY][currentX] != 0) {
          currentX++;
          if (currentX >= NUM_COLS) {
            currentX = 0;
            currentY++;
            while (currentY >= grid.length) {
              grid.push(new Array(NUM_COLS).fill(0));
            }
          }
        }

        const sizes = shuffle(photo.gridSize);
        let sizeIndex = 0;
        let size = {row: 0, col: 0, className: ""};
        // 2. Determine ideal dimensions based on your rules
        while (true) {
            const {row, col, className} = GRID_SIZE[sizes[sizeIndex]];
            if (isAreaFree(currentX, currentY, row, col, grid)) {
                size = {row, col ,className };
                break;
            } else {
                if (sizeIndex < sizes.length - 1)
                    sizeIndex++;
                else {
                    currentX = 0;
                    currentY++;
                    while (currentY >= grid.length) {
                        grid.push(new Array(NUM_COLS).fill(0));
                    }
                    sizeIndex = 0;
                }
            }



        }

    
        // 3. Commit to layout
        markArea(currentX, currentY, size.col, size.row, grid);
        layout.push({
          ...photo,
            className: size.className,
          orientation: photo.orientation,
        });
      }
    


      return layout;
    
    

}