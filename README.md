Assumptions:
* All trades can happen simultaenously within time time
  * Possible for large investors who can maintian a balance across exchanges
  * In real life, must compute minimum weight cycle in t time.
* No fees
  * Large capital can make a profit

Features
* New algorithm is faster than APSP
  * Needs integer values for weights

Architecture
* Graph nodes are a currency on one exchange
* Graph edges are the exchange rate between exchanges
* Graph is bidirectional and symmetric