#include <stdio.h>
#include "awk_sem.h"

int main(void) {
    int i = 0 ;
    int semP1, semP2, semP3;
    // *** please insert proper semaphore initialization here
    semP1 = get_sem(".",'P1');
    semP2 = get_sem(".",'P2');
    semP3 = get_sem(".",'P3');

    if (semP1==-1 && semP2==-1 && semP3==-1) {
        semP1 = create_sem(".",'P1',1);
        semP2 = create_sem(".",'P2',0);
        semP3 = create_sem(".",'P3',0);
    }

    do {
        P(semP2);

        printf("P222222222 is here\n"); i++ ;
       
        // *** this is where you should place semaphore
        V(semP3);
        V(semP3);

    }  while (i < 5);
}