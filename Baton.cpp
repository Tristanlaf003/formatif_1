#include "Baton.h"

Baton::Baton(Sort* sort)
{
    m_mana = 50;
    m_sort = sort;
}

int Baton::getMana()
{
    return m_mana;
}

int Baton::getSortAttaque() {
    return m_sort->getSortAttaqueDommage();
}

int Baton::getSortDommage() {
    return m_sort->getSortDefenseDommage();
}

std::string Baton::getSortNom() {
    return m_sort->getNom();
}

void Baton::setMana()
{
    m_mana -= 10;
}

std::string Baton::getAttaqueNom()
{
    return m_sort->getSortAttaqueNom();
}

std::string Baton::getDommageNom()
{
    return m_sort->getSortDefenseNom();
}
