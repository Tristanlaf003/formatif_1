#include "Magicien.h"

Magicien::Magicien(Baton* baton)
{
	m_baton = baton;
	m_vieJoueur = 50;
	m_vieBouclier = 0;
}

int Magicien::getVieJoueur()
{
	return m_vieJoueur;
}

int Magicien::getVieBouclier()
{
	return m_vieBouclier;
}

std::string Magicien::getNom()
{
	return m_baton->getSortNom();;
}

void Magicien::changerBaton(Baton* baton, Magicien magicien)
{
	Sort sort = Sort(baton->getAttaqueNom(), -10, baton->getDommageNom(), 10);
	delete baton;
	Baton* newbaton = new Baton(&sort);
	magicien.m_baton = newbaton;
	
}

int Magicien::lancerSortAttaque(Magicien* magicien)
{
	bool mana = verifiMana();
	int reponse = 0;
	std::size_t nomSortPresentString = m_baton->getSortNom().find("Foudre");
	if (nomSortPresentString == -1 && mana == true) //Sort incinérateur
	{
		if (magicien->m_vieBouclier >= 0 && (magicien->m_vieBouclier + magicien->m_baton->getSortAttaque()) >= 0)
		{
			magicien->m_vieBouclier += magicien->m_baton->getSortAttaque();
			m_baton->setMana();
			reponse = 100;
		}
		else
		{
			int difference = m_vieBouclier - magicien->m_baton->getSortAttaque();
			magicien->m_vieJoueur -= difference;
			magicien->m_vieBouclier = 0;
			m_baton->setMana();
			reponse = 200;
		}
		
	}
	else if (nomSortPresentString >= 10 && mana == true) //Sort Foudre
	{
		magicien->setVie(m_baton->getSortAttaque());
		m_baton->setMana();
		reponse = 300;
	}
	if (mana == false)
	{

		//changerBaton(magicien->m_baton, *magicien);
	}
	return reponse;
}

int Magicien::lancerSortDefense(Magicien* magicien)
{
	bool mana = verifiMana();
	int reponse = 0;
	std::size_t nomSortPresentString = m_baton->getSortNom().find("Guerison");
	if (nomSortPresentString == -1 && mana == true) //Sort Protection
	{
		setBouclier(magicien->m_baton->getSortDommage());
		m_baton->setMana();
		reponse = 100;
	}
	else if (nomSortPresentString == 0 && mana == true) //Sort Guérison
	{
		setVie(magicien->m_baton->getSortDommage());
		m_baton->setMana();
		reponse = 200;
	}
	if (mana == false)
	{
		changerBaton(magicien->m_baton, *magicien);
	}
	return reponse;
}

void Magicien::setVie(int vie) {
	if ((m_vieJoueur + vie) > 100)
	{
		m_vieJoueur = 100;
	}
	else if (m_vieJoueur <= 100)
	{
		m_vieJoueur += vie;
	}
}

int Magicien::getMana()
{
	return m_baton->getMana();
}

void Magicien::setBouclier(int bouclier)
{
	if ((m_vieBouclier + bouclier) > 50)
	{
		m_vieBouclier = 50;
	}
	else if (m_vieBouclier <= 50)
	{
		m_vieBouclier += bouclier;
	}
}

bool Magicien::verifiMana() {
	if ((m_baton->getMana() - 10) > 0)
	{
		return true;
	}
	else
	{

		return false;
	}
}


