#ifndef BATON_DEF
#define BATON_DEF

#include "Sort.h"

class Baton
{
private:
	int m_mana;
	Sort* m_sort;
public:
	Baton(Sort* sort);
	int getMana();
	int getSortAttaque();
	int getSortDommage();
	std::string getSortNom();
	void setMana();
	std::string getAttaqueNom();
	std::string getDommageNom();
};
#endif
