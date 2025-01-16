
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sys
plt.style.use('seaborn-v0_8-darkgrid')


if len(sys.argv) != 2:
    raise IOError

filename = sys.argv[1]


df = pd.read_csv(filename)
df['dist'] = 1000 / df.parallax
df['Mg'] = df.mg - 5 * np.log10(df.dist/10)
df['b_r'] = df.mb - df.mr


fig, ax = plt.subplots(figsize=(10,10))
ax.plot(df.b_r, df.Mg, '.', color='#0f4b6e', alpha=0.75, markersize=10)
ax.invert_yaxis()
ax.set_xlabel(r'$m_{BP} - m_{RP}$', fontsize=26)
ax.set_ylabel(r'$M_{G}$', fontsize=26)
ax.tick_params(labelsize=26)
ax.set_xlim([-.5,3.5])
ax.set_ylim([11,-2])
plt.savefig(filename[:-4] + '_plot.png')
