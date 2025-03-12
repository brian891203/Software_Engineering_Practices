#include <stdio.h>
#include "awk_sem.h"

int main(void) {
    int i = 0 ;
    int semP1, semP2, semP3, semP3_2;

    // *** Please insert proper semaphore initialization here
    semP1 = create_sem(".",'P1',1);
    semP2 = create_sem(".",'P2',0);
    semP3 = create_sem(".",'P3',0);

    do {
        // *** this is where you should place semaphore 
        // if (semP1 && semP3) {
        //     V(semP3_2);
        // }

        P(semP1);

        printf("P1111111111 is here\n"); i++;
       
        // *** this is where you should place semaphore
        V(semP2);

    }  while (i < 5) ;
}