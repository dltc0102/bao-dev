import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Coordinate points
coordinates = {
    "g1": (798, 22, -515), # b3
    "g2": (843, 21, -521), # b3
    "g3": (778, -41, -504), # b2
    "g4": (781, 21, -572), # b4
    "g5": (802, -48, -572), # b5
    "g6": (691, -43, -528), # b1
    "g7": (644, -42, -481), # b1
    "g8": (615, -9, -512), # b1
    "g9": (698, 35, -632), # b6
    "g10": (811, -36, -623), # b5
    "g11": (782, -48, -631), # b5
    "g12": (683, 0, -447), # b1
    "g13": (697, -39, -418), # b1
    "g14": (801, -50, -455), # b2
    "g15": (830, -35, -487), # b2
    "g16": (844, -50, -499), # b2
    "hub": (727, -17, -539), 
    "refb1": (673, -42, -512), # b1
    "refb2": (818, -45, -501), # b2
    "refb5": (801, -50, -600), # b5
}

# Lines connecting points
lines = [
    ("hub", "g6", "g"),  # Branch 1: Green colored line
    ("g6", "refb1", "g"),
    ("refb1", "g7", "g"),
    ("refb1", "g8", "g"),
    ("g6", "g12", "g"),
    ("g6", "g13", "g"),

    ("hub", "g3", "y"),  # Branch 2: Yellow colored line
    ("g3", "g14", "y"),
    ("g3", "refb2", "y"),
    ("refb2", "g15", "y"),
    ("refb2", "g16", "y"),

    ("hub", "g1", "b"), # Branch 3: Blue colored line
    ("g1", "g2", "b"),

    ("hub", "g4", "r"), # Branch 4: Red colored line

    ("hub", "g5", "m"), # Branch 5: Magenta colored line
    ("g5", "refb5", "m"), 
    ("refb5", "g11", "m"), 
    ("refb5", "g10", "m"),

    ("hub", "g9", "c"), # Branch 6: Cyan colored line
]

# Extract x, y, z coordinates
x = [coord[0] for coord in coordinates.values()]
y = [coord[1] for coord in coordinates.values()]
z = [coord[2] for coord in coordinates.values()]

# Create a figure and a 3D axis with larger size
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Scatter plot with smaller marker size and custom colors
colors = ['r' if 'g6' not in label and 'g3' not in label else color for label, _, color in lines]
ax.scatter(x, y, z, c='r', marker='o', s=50)  # Use a single color for all points in the scatter plot

# Plot lines
for start, end, color in lines:
    ax.plot([coordinates[start][0], coordinates[end][0]],
            [coordinates[start][1], coordinates[end][1]],
            [coordinates[start][2], coordinates[end][2]], color=color)

# Set labels for each axis with smaller font size
ax.set_xlabel('X-axis', fontsize=10)
ax.set_ylabel('Y-axis', fontsize=10)
ax.set_zlabel('Z-axis', fontsize=10)

# Annotate each point with smaller font size, excluding "refb1" and "refb2"
for label, coord in coordinates.items():
    if label not in ["refb1", "refb2", "refb5"]:
        ax.text(coord[0], coord[1], coord[2], label, fontsize=8)

# Show the plot
plt.show()
