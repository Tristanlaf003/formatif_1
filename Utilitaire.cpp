#include "Utilitaire.h"
#include <random>

Utilitaire::Utilitaire(int min, int max) {
    m_min = min;
    m_max = max;
}

int Utilitaire::random()
{
    std::random_device rd;
    std::mt19937 rn(rd());
    std::uniform_int_distribution<> rng(m_min, m_max);
    return rng(rn);
}
