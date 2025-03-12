#include <stdio.h>
#include "awk_sem.h"

int main(void) {
    int i = 0 ;
    int semP2, semP3;
    // *** please insert proper semaphore initialization here
    semP2 = get_sem(".",'P2');
    semP3 = get_sem(".",'P3');

    do {
        // *** this is where you should place semaphore
        P(semP2);

        printf("P222222222 is here\n"); i++ ;
       
        // *** this is where you should place semaphore
        V(semP3);
        V(semP3);

    }  while (i < 5);
}