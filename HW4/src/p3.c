#include <stdio.h>
#include "awk_sem.h"

int main(void) {
    int i = 0 ;
    int semP1, semP2, semP3;
    // *** please insert proper semaphore initialization here
    semP3 = get_sem(".",'P3');
    semP2 = get_sem(".",'P2');
    semP1 = get_sem(".",'P1');

    do {
        // *** this is where you should place semaphore
        P(semP3);
       
        printf("P3333333 is here\n"); i++ ;
       
        // *** this is where you should place semaphore
        V(semP1);
   
    }  while (i < 5);

    destroy_sem(semP1);
    printf("(p1) semaphore removed\n");

    destroy_sem(semP2);
    printf("(p2) semaphore removed\n");

    destroy_sem(semP3);
    printf("(p3) semaphore removed\n");
    
    return 0;
}