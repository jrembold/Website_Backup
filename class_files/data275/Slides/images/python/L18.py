import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.inspection import DecisionBoundaryDisplay as DBD
from sklearn.ensemble import VotingClassifier
from sklearn.model_selection import train_test_split


plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)

data = pd.read_csv('./banana.csv')
train, test = train_test_split(data, test_size=0.2, random_state=0)

def plot_dec(ax, model, title=None):
    DBD.from_estimator(model, train[['x','y']], ax=ax, cmap='seismic', alpha=0.4)
    ax.scatter(data.x, data.y, c=data.type, cmap='seismic', s=60)
    ax.grid(False)
    ax.set_xlabel('x', fontsize=18)
    ax.set_ylabel('y', fontsize=18)
    if title:
        ax.set_title(title, fontsize=18)

def voting_classifier():

    log_mod = LogisticRegression()
    log_mod.fit(train[['x','y']], train.type)

    tree = DecisionTreeClassifier(max_depth=4, random_state=1)
    tree.fit(train[['x','y']], train.type)

    combo = VotingClassifier(
        [('logreg',log_mod), ('dec_tree',tree)],
        voting='soft')
    combo.fit(train[['x','y']], train.type)


    fig, ax = plt.subplots(figsize=(7.5*3, 7.5), dpi=96, ncols=3)
    plot_dec(ax[0], log_mod, 'Logistic Regression')
    plot_dec(ax[1], tree, 'Decision Tree')
    plot_dec(ax[2], combo, 'Ensemble')
    plt.savefig('VotingClassifier', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

def ensembles():
    from sklearn.ensemble import RandomForestClassifier
    from itertools import product

    forest = RandomForestClassifier()
    forest.fit(train[['x','y']], train.type)

    fig, ax = plt.subplots(figsize=(7.5*3,7.5*2), dpi=96, ncols=3, nrows=2)
    for idx, model, tt in zip(
        product(range(2), range(3)),
        [*forest.estimators_[:5], forest],
        [*[f"Tree {i}" for i in range(5)], "Forest"]
    ):
        plot_dec(ax[idx], model, tt)
    plt.savefig('ForestBuilding.png', facecolor="#ffffff00", bbox_inches='tight')
    plt.show()

def warm_start():
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import make_moons

    X,y = make_moons(1000, noise=0.3)
    data = pd.DataFrame(X, columns=['x','y'])
    data['type']= y

    plt.scatter(data.x, data.y, c=data.type, cmap='seismic')
    plt.show()

    train, test = train_test_split(data, test_size=0.2, random_state=0)

    forest = RandomForestClassifier(warm_start=True)
    train_scores = []
    test_scores = []
    estimator_range = range(1, 100, 1)
    for n_estimators in estimator_range:
        forest.n_estimators = n_estimators
        forest.fit(train[['x','y']], train.type)
        train_scores.append(forest.score(train[['x','y']], train.type))
        test_scores.append(forest.score(test[['x','y']], test.type))

    fig, ax = plt.subplots(figsize=(7.5, 7.5), dpi=96)
    ax.plot(estimator_range, train_scores, lw=4, label='Training data')
    ax.plot(estimator_range, test_scores, lw=4, label='Testing data')
    ax.set_xlabel('Number of Trees', fontsize=18)
    ax.set_ylabel('Score', fontsize=18)
    ax.legend(fontsize=14)
    plt.savefig('warm_start.png', facecolor="#ffffff00", bbox_inches='tight')
    plt.show()

if __name__ == '__main__':
    # voting_classifier()
    # ensembles()
    warm_start()
