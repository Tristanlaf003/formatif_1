#ifndef MAGICIEN_DEF
#define MAGICIEN_DEF
#include "Baton.h"

class Magicien
{
private:
	int m_vieJoueur;
	int m_vieBouclier;
	Baton* m_baton;
public:
	Magicien(Baton* baton);
	int getVieJoueur();
	int getVieBouclier();
	std::string getNom();
	void setVie(int vie);
	int getMana();
	void setBouclier(int bouclier);
	void changerBaton(Baton* baton, Magicien magicien);
	int lancerSortAttaque(Magicien* magicien);
	int lancerSortDefense(Magicien* magicien);
	bool verifiMana();
};
#endif
