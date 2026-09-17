import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class Junit {

    @Test
    public final void estPionAlliee() {
        //Test deux pieces alliées noires
        char pieceN = 'R';
        char destinationN = 'T';
        assertTrue(Pieces.estPieceAlliee(pieceN, destinationN), "Deux pièces maj (noire).");

        //test pieces allies blanches
        char pieceB = 'r';
        char destinationB = 't';
        assertTrue(Pieces.estPieceAlliee(pieceB, destinationB), "Deux pièces min (blanche).");

        //test pieces adeverse
        char piece1 = 'r';
        char destination1 = 'T';
        assertFalse(Pieces.estPieceAlliee(piece1, destination1), "deux piece diff (peut manger l'adversaire).");
    }

    @Test
    public final void obstacle() {
        char[][] echiquier = {
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', 'p', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', 'P', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '}
        };

        int[] coordonneeDepart = {1, 1};  // Pion à (1,1)
        int[] coordonneeArrivee = {2, 1}; // Destination à (3,1)

        assertFalse(Pieces.obstacle(echiquier, coordonneeDepart[0], coordonneeDepart[1], coordonneeArrivee[0], coordonneeArrivee[1]));

        // Test où il y a un obstacle entre (1,1) et (3,1)
        int[]coordonneeArrivee1 = new int[]{3, 1};
        assertTrue(Pieces.obstacle(echiquier, coordonneeDepart[0], coordonneeDepart[1], coordonneeArrivee1[0], coordonneeArrivee1[1]));
    }

    @Test
    public final void mangePieceAdverse(){
        char[][] echiquier = {
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', 'p', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', 'P', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '}
        };

        int[] coordonneeDepart = {1, 1};  // Pion à (1,1)
        int[]coordonneeArrivee = new int[]{3, 1};
        int[]coordonneeArrivee1 = new int[]{2, 1};

        assertFalse(Pieces.mangePieceAdverse(echiquier,coordonneeDepart,coordonneeArrivee,true),"cas de case vide");
        assertTrue(Pieces.mangePieceAdverse(echiquier, coordonneeDepart,coordonneeArrivee1,true),"cas mange piece adverse");

    }

    @Test
    public final void testObstacleRoqueAvecObstacle() {
        char[][] echiquier = {
                {'T', ' ', 'p', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '}
        };
        assertTrue(Pieces.obstacleRoque(echiquier, 0, 1, 4),"obstacle present");

        char[][] echiquier1 = {
                {'T', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '},
                {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '}
        };

        assertFalse(Pieces.obstacleRoque(echiquier1, 0, 1, 6),"pas obstacle présent");
    }
}
