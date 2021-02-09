#include <iostream>
#include "Magicien.h"
#include "Utilitaire.h"

void informationMagicien(Magicien* joueur, Magicien* ennemi, int nombreTour) {
    //Information sur les magiciens
    std::cout << "Nombre de tour : " << nombreTour << "\n";
    std::cout << "Nom joueur : " << joueur->getNom() << "\nNom ennemi : " << ennemi->getNom();
    std::cout << "\nEnnemi  Vie : " << ennemi->getVieJoueur() << " Bouclier " << ennemi->getVieBouclier();
    std::cout << "\nJoueur Vie : " << joueur->getVieJoueur() << " Bouclier " << joueur->getVieBouclier();
    std::cout << "\nJoueur Mana : " << joueur->getMana() << "\nEnnemi Mana : " << ennemi->getMana();
    std::cout << "\n-------------------------------------------------------------------------------\n";
}

void joueurStrategie(Magicien* joueur, Magicien* ennemi, int nombreTour) {
    int strategie;
    std::cout << "\nStrategie : Attaque : 0   Defense : 1\n";
    std::cin >> strategie;
    if (strategie == 0)
    {
        joueur->lancerSortAttaque(ennemi);
    }
    else if (strategie == 1)
    {
        joueur->lancerSortDefense(joueur);
    }

    //Information sur les magiciens
    informationMagicien(ennemi, joueur, nombreTour);
}

void ennemiStrategie(Magicien* joueur, Magicien* ennemi, int nombreTour, Utilitaire utilitaire) {
    //int strategieOrdinateur;
    //std::cin >> strategieOrdinateur;
    int strategieOrdinateur = utilitaire.random();
    if (strategieOrdinateur == 0)
    {
        ennemi->lancerSortAttaque(joueur);
    }
    else if (strategieOrdinateur == 1)
    {
        ennemi->lancerSortDefense(ennemi);
    }

    //Information sur les magiciens
    informationMagicien(ennemi, joueur, nombreTour);
}


bool niveauVie(Magicien* joueur, Magicien* enneni) {
    if (joueur->getVieJoueur() <= 0)
    {
        std::cout << "Le joueur a gagnee avec " << joueur->getVieJoueur() << " point de vie.";
        return false;
    }
    else if (enneni->getVieJoueur() <= 0)
    {
        std::cout << "L'ennemi a gagnee avec " << enneni->getVieJoueur() << " point de vie.";
        return false;
    }
    return true;
}
int main()
{
    Utilitaire utilitaire = Utilitaire(0,1);
    //Tableau de nom d'attaque et de défense
    std::string nomSortAttaque[2]{ "Guerison","Protection" };
    std::string nomSortDommage[2]{ "Incinerateur","Foudre" };

    Sort sortJoueur = Sort(nomSortAttaque[utilitaire.random()], -10, nomSortDommage[utilitaire.random()], 10);
    Sort sortEnnemi = Sort(nomSortAttaque[utilitaire.random()], -10, nomSortDommage[utilitaire.random()], 10);

    //Initialization du baton avec les sorts pour le joueur et l'ennemi
    Baton* batonJoueur = new Baton(&sortJoueur);
    Baton* batonEnnemi = new Baton(&sortEnnemi);

    //Initialization des magicien pour avec le baton du joueur et l'ennemi
    Magicien joueur = Magicien(batonJoueur);
    Magicien ennemi = Magicien(batonEnnemi);

    bool vie = true;
    int nombreTour{ 0 };
    informationMagicien(&joueur, &ennemi, nombreTour);
    while (vie == true)
    {
        nombreTour++;
        int randomTour = utilitaire.random();
        if (randomTour == 1)
        {
            //Joueur
            joueurStrategie(&joueur, &ennemi, nombreTour);

            //Vérification du niveau de vie des magiciens
            vie = niveauVie(&joueur, &ennemi);
            if (vie == true)
            {
                //Ordinateur
                ennemiStrategie(&joueur, &ennemi, nombreTour, utilitaire);

                //Vérification du niveau de vie des magiciens
                vie = niveauVie(&joueur, &ennemi);
            }
        }
        else
        {
            //Ordinateur
            ennemiStrategie(&joueur, &ennemi, nombreTour, utilitaire);

            //Vérification du niveau de vie des magiciens
            vie = niveauVie(&joueur, &ennemi);

            if (vie == true)
            {
                //Joueur
                joueurStrategie(&joueur, &ennemi, nombreTour);

                //Vérification du niveau de vie des magiciens
                vie = niveauVie(&joueur, &ennemi);
            }
        }
    }
}
