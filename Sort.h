#ifndef SORT_DEF
#define SORT_DEF

#include <string>
class Sort
{
private:
	std::string m_sortAttaqueNom;
	int m_sortAttaqueDommage;
	std::string m_sortDefenseNom;
	int m_sortDefenseDommage;
public:
	Sort(std::string sortAttaque, int sortAttaqueDommage, std::string sortDefense, int sortDefenseDommage);
	std::string getNom();
	int getSortAttaqueDommage();
	int getSortDefenseDommage();
	std::string getSortAttaqueNom();
	std::string getSortDefenseNom();
};
#endif
