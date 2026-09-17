public class Main {

    public static char[][] echiquier = new char[8][8];
    public static String[][] echiquierString;
    public static void main(String[] args) {

        String pseudo1 = Menu.demandePseudo1();
        String pseudo2 = Menu.demandePseudo2();
        boolean ps1Commence = Menu.j1Commence(); // Booléen qui renvoie vrai si le j1 commence
        if (ps1Commence) {
            System.out.println(pseudo1 + " jouera avec les blancs.");
            System.out.println(pseudo2 + " jouera avec les noirs.");
        } else {
            System.out.println(pseudo2 + " jouera avec les blancs.");
            System.out.println(pseudo1 + " jouera avec les noirs.");
        }
        Menu.InitialisePlateau();

        if (ps1Commence) {
            while (true) {
                Menu.demandeLeCoupBlanc(pseudo1);
                Menu.demandeLeCoupNoir(pseudo2);
            }
        }
        else {
            while (true) {
                Menu.demandeLeCoupBlanc(pseudo2);
                Menu.demandeLeCoupNoir(pseudo1);
            }
        }
    }
}
