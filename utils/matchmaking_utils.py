import pandas as pd
import numpy as np
from scipy.optimize import linear_sum_assignment
from Levenshtein import distance as levenshtein_distance

class Matchmaker:
    def __init__(self, data):
        self.df = data

    def calculate_compatibility(self, person_a, person_b):
        score = 0
        max_score = 100 # Normalize later

        # Hard Limits (Gender Preference)
        # Assuming format: Gender: 'Male', Pref: 'Female'
        # If A likes B's gender AND B likes A's gender
        
        a_gender = person_a.get('gender')
        a_pref = person_a.get('gender_pref')
        b_gender = person_b.get('gender')
        b_pref = person_b.get('gender_pref')

        if a_pref != 'No Preference' and a_pref != b_gender:
            return 0
        if b_pref != 'No Preference' and b_pref != a_gender:
            return 0

        # Grade & Age Bias (Similar is better)
        grade_diff = abs(int(person_a.get('grade', 0)) - int(person_b.get('grade', 0)))
        age_diff = abs(int(person_a.get('age', 0)) - int(person_b.get('age', 0)))
        
        # Penalize differences
        score += max(0, 20 - (grade_diff * 5)) # Max 20 points for grade
        score += max(0, 20 - (age_diff * 5))   # Max 20 points for age

        # Other factors (Placeholders for now)
        # Example: Introvert/Extrovert (Similar or Complementary? Assuming similar for now)
        # score += ...

        return score

    def run_matchmaking(self):
        users = self.df.to_dict('records')
        n = len(users)
        cost_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(n):
                if i == j:
                    cost_matrix[i][j] = 1000 # High cost to match with self
                else:
                    # We want to MAXIMIZE score, so we MINIMIZE cost
                    # Cost = Max_Possible_Score - Actual_Score
                    score = self.calculate_compatibility(users[i], users[j])
                    cost_matrix[i][j] = 100 - score

        row_ind, col_ind = linear_sum_assignment(cost_matrix)
        
        matches = []
        matched_ids = set()
        
        for i, j in zip(row_ind, col_ind):
            if i in matched_ids or j in matched_ids:
                continue
            
            # Since the matrix is symmetric (mostly), we might get (A,B) and (B,A)
            # We only want unique pairs
            matches.append((users[i], users[j], 100 - cost_matrix[i][j]))
            matched_ids.add(i)
            matched_ids.add(j)
            
        return matches
