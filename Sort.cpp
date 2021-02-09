#include "Sort.h"

Sort::Sort(std::string sortAttaque, int sortAttaqueDommage, std::string sortDefense, int sortDefenseDommage) :
	m_sortAttaqueNom{ sortAttaque }, m_sortAttaqueDommage{ sortAttaqueDommage }, m_sortDefenseNom{ sortDefense }, m_sortDefenseDommage{ sortDefenseDommage }{}


std::string Sort::getNom()
{
	return m_sortAttaqueNom + " de " + m_sortDefenseNom;
}

int Sort::getSortAttaqueDommage()
{
	return m_sortAttaqueDommage;
}

int Sort::getSortDefenseDommage()
{
	return m_sortDefenseDommage;
}

std::string Sort::getSortAttaqueNom()
{
	return m_sortAttaqueNom;
}

std::string Sort::getSortDefenseNom()
{
	return m_sortDefenseNom;
}
