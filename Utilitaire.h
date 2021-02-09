#ifndef UTILITAIRE_DEF
#define UTILITAIRE_DEF
class Utilitaire
{
private:
	int m_max;
	int m_min;

public:
	Utilitaire(int min, int max);
	int random();
};
#endif
