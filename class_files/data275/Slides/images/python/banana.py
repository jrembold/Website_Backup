

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.inspection import DecisionBoundaryDisplay as DBD
from sklearn.metrics import confusion_matrix

df = pd.read_csv('./banana.csv')
# train = df.copy()
train, test = train_test_split(df, test_size=0.2, random_state=0)

tree = DecisionTreeClassifier(random_state=0)
tree.fit(train[['x',' y']], train['type'])

plot_tree(tree, filled=True, feature_names=df.columns[:2])
plt.show()

preds = tree.predict(test[['x',' y']])

print(confusion_matrix(test.type, preds))
print(tree.feature_importances_)

# DBD.from_estimator(tree, df[['x',' y']], cmap='seismic', grid_resolution=200)
# plt.show()
