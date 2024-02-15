#include <stdio.h>

void flip(int *num) {
    *num = -(*num); // Invert the sign of the integer
}

int main() {
    int number = -10;
    printf("Before flip: %d\n", number);
    flip(&number);
    printf("After flip: %d\n", number);
    return 0;
}
